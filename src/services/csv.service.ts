import { createReadStream } from "fs";
import csv2json from "csvtojson";
import { pipeline, Transform, TransformCallback } from "stream";
import { Order, OrderProperties } from "../dtos/order.dto";
import { validate, ValidationError } from "class-validator";
import { stdout } from "process";
import { plainToClass } from "class-transformer";

class OrderTransformer extends Transform {
  private currentLine = 0;

  constructor() {
    super({ objectMode: true });
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    {
      const chunkAsJson: OrderProperties = JSON.parse(chunk);
      chunkAsJson.line = ++this.currentLine;
      const order = plainToClass(Order, chunkAsJson);

      validate(order)
        .then((errors) => {
          if (errors.length > 0) {
            const prettyErrors = this.extractValidationErrors(errors);
            callback(
              new Error(
                JSON.stringify({ errors: prettyErrors, line: order.line })
              ),
              null
            );
          } else {
            callback(null, "");
          }
        })
        .catch(callback);
    }
  }

  private extractValidationErrors(errors: ValidationError[]) {
    return errors.map((error) => {
      const messages: string[] = [];
      for (const property in error.constraints) {
        messages.push(error.constraints[property]);
      }
      return {
        messages: messages,
        path: error.property,
        value: error.value,
      };
    });
  }

  // _final(callback: (error?: Error) => void): void {
  //   callback();
  // }
}
const asd = new OrderTransformer();

pipeline(
  createReadStream("shipments_data.csv"),
  csv2json(),
  asd,
  stdout,
  (err) => {
    console.log(err, ">>");

    if (err) {
      console.log(err, "<<");
      console.error("FUCXK!");
    }
  }
).on("error", (err) => {
  console.error(err);
});

import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { Express } from 'express';
import 'reflect-metadata';
import { createExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { OpenAPIObject } from 'openapi3-ts';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import * as swaggerUiExpress from 'swagger-ui-express';
import { ImportController } from './controllers/import.controller';
import { AuthController } from './controllers/auth.controller';
import { errorHandler } from './middlewares/errorHandler.middleware';

const { defaultMetadataStorage } = require('class-transformer/cjs/storage');

const routingControllersOptions = {
  controllers: [ImportController, AuthController],
  routePrefix: '/api',
};
const app: Express = createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const schemas = validationMetadatasToSchemas({
  classTransformerMetadataStorage: defaultMetadataStorage,
  refPointerPrefix: '#/components/schemas/',
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const openAPI: Partial<OpenAPIObject> = {
  components: {
    schemas,
    securitySchemes: {
      jwt: {
        scheme: 'bearer',
        type: 'http',
      },
    },
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0',
  },
};
const spec = routingControllersToSpec(storage, routingControllersOptions, openAPI);

// Error handler
app.use(errorHandler);

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));

export default app;

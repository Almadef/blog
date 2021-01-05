import { BlogModule } from 'src/modules/blog/blog.module';
import { ConfigBase } from './../../common/bases/config.base';
import { ConfigInterface } from './../config.interface';
import { GqlModuleOptions } from '@nestjs/graphql';

class GraphqlConfig extends ConfigBase implements ConfigInterface {
  constructor() {
    super();
  }

  public getConfig(): GqlModuleOptions {
    return {
      include: [BlogModule],
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      debug: !this.isProduction(),
      playground: !this.isProduction(),
    };
  }
}

const graphqlConfig = new GraphqlConfig();

export { graphqlConfig };

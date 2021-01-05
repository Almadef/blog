import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../../../common/graphql/paginated';
import { CategoryOneDto } from './category-one.dto';

@ObjectType()
export class CategoriesListDto extends Paginated(CategoryOneDto) {}

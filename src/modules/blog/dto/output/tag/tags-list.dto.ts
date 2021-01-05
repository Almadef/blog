import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../../../../common/graphql/paginated';
import { TagOneDto } from './tag-one.dto';

@ObjectType()
export class TagsListDto extends Paginated(TagOneDto) {}

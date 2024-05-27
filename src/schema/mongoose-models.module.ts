import {Global,Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Auth, AuthSchema } from './auth.schema'
import { Group, GroupSchema } from './group.schema'

const Models=[

    { name: Auth.name, schema:AuthSchema },
    {name:Group.name,schema:GroupSchema}

]
@Global()
@Module({
    imports:[MongooseModule.forFeature(Models)],
    exports:[MongooseModule]
})
export class MongooseModelsModule{}
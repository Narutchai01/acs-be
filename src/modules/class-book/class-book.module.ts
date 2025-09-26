import { Module } from '@nestjs/common';
import { ClassBookService } from './class-book.service';
import { ClassBookController } from './class-book.controller';
import { RepositoriesModule } from 'src/repositories/repositories.module';
import { SupabaseModule } from 'src/provider/store/supabase/supabase.module';
import { ClassBookFactory } from './class-book.factory';

@Module({
  imports: [RepositoriesModule, SupabaseModule],
  controllers: [ClassBookController],
  providers: [ClassBookService, ClassBookFactory],
})
export class ClassBookModule {}

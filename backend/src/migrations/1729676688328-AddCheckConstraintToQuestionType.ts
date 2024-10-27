import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCheckConstraintToQuestionType1729676688328
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
        ALTER TABLE public.questions
        ADD CONSTRAINT question_type_check
        CHECK (question_type IN ('single_line_string', 'multi_line_text', 'positive_integer', 'checkbox'));
      `);
      console.log('Ограничение CHECK успешно добавлено в таблицу questions');
    } catch (error) {
      console.error('Ошибка при добавлении ограничения CHECK:', error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
        ALTER TABLE public.questions
        DROP CONSTRAINT question_type_check;
      `);
      console.log('Ограничение CHECK успешно удалено из таблицы questions');
    } catch (error) {
      console.error('Ошибка при удалении ограничения CHECK:', error);
    }
  }
}

import { db, searches } from 'lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  await db.insert(searches).values([
    {
      id: 12345,
      machine_id: "robot_arm",
      grease_id: "10W30",
      standard_id: 1,
      test_id: 1,
      delta_e2000: '27.7',
      delta_e76: '30.3'
    },
    {
      id: 12346,
      machine_id: 'robot_arm',
      grease_id: '10W30',
      standard_id: 1,
      test_id: 1,
      delta_e2000: '27.7',
      delta_e76: '30.3'
    },
    {
      id: 12347,
      machine_id: 'robot_arm',
      grease_id: '10W30',
      standard_id: 1,
      test_id: 1,
      delta_e2000: '27.7',
      delta_e76: '30.3'
    },
    {
      id: 12348,
      machine_id: 'robot_arm',
      grease_id: '10W30',
      standard_id: 1,
      test_id: 1,
      delta_e2000: '27.7',
      delta_e76: '30.3'
    }
  ]);
}

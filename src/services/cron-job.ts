// @ts-ignore
import CronJobManager from 'cron-job-manager';

const managerAllJob = new CronJobManager(
  'a_key_string_to_call_this_job',
  '* * * * * *',
  () => {
    console.log('tick - what should be executed?');
  },
  {
    start: true,
    timeZone: 'America/Los_Angeles',
    onComplete: () => {
      console.log('a_key_string_to_call_this_job has stopped....');
    },
  }
);

export default managerAllJob;

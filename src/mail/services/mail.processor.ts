import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from './mail.service';
import { OnQueueActive, OnQueueCompleted, OnQueueFailed, Process } from '@nestjs/bull';

// export class MailProcessor extends WorkerHost {
//     constructor(private readonly mailService: MailService) { super(); }
//     // // @Process()
//     // async handleMailJob(job: Job<any>) {
//     //     try {
//     //         await this.mailService.sendmail();
//     //         // logic to send mail
//     //     } catch (error) {
//     //         // logic to push the job to error-queue
//     //     }
//     // }
// }
@Processor('mail-queue')
export class MailProcessor extends WorkerHost {
    constructor(private readonly mailService: MailService) {
        super();
    }
    @Process()
    async process(job: Job<any>) {
        console.log(job)
        console.log('Processing job:', job.id, job.data);
        // await this.mailService.sendmail(job.data);
    }
    @OnQueueActive()
    onActive(job: Job) {
        console.log(`Processing job ${job.id} of type ${job.name}. Data:`, job.data);
    }
    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        console.log(`Completed job ${job.id} of type ${job.name}. Result:`, result);
    }

    @OnQueueFailed()
    onError(job: Job, error: any) {
        console.log(`Failed job ${job.id} of type ${job.name}. Error:`, error);
    }
}
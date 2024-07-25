import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq'
import { mailTemplate } from './mail.template';


@Injectable()
export class MailService {
    constructor(@InjectQueue('mail-queue') private readonly queue: Queue) { }
    async addJobsInBulk(jobs: { serverName: string, to: string; subject: string; message: any }[]) {
        const bulkJobs = jobs.map(job => ({
            name: 'sendMail',
            data: {
                serverName: job.serverName,
                to: job.to,
                subject: job.subject,
                message: mailTemplate,
            },
        }));
        await this.queue.addBulk(bulkJobs)
    }


    async addJob(job: { serverName: string, to: string; subject: string; message: any }) {

        await this.queue.add("job-name", job)
    }
}

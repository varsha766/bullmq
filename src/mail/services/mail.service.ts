import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bullmq'
import * as nodemailer from 'nodemailer';


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
                message: job.message,
            },
        }));
        await this.queue.addBulk(bulkJobs)
    }

    async sendmail(data) {
        console.log(data, "inside send mail service")
        const transporter = nodemailer.createTransport({
            host: "c103948.sgvps.net",
            port: 465,
            auth: {
                "user": "drops@fyre.id",
                "pass": "Drops_Fyre@iD666",
            }

        })
        console.log(transporter, "traansporter")
        Logger.log('send mail')
        // const info = await transporter.sendMail({
        //     from: "drops@fyre.id",
        //     to: "varshakumari370@gmail.com",
        //     subject: 'test',
        //     html: "test"
        // })
        // console.log(info, "onfo")
        // return info
    }
}

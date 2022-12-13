import * as core from '@actions/core';

interface IUser {
    username: string,
    password: string
    email: string,
}

export class InstallCommand {
    constructor(
        private readonly adminUser: IUser,
        private readonly boardTitle: string,
        private readonly boardUrl: string,
    ) {}

    toArray(): Array<string> {
        return [
            'cmd.php',
            'xf:install',
            `--user=${this.adminUser.username}`,
            `--password=${this.adminUser.password}`,
            `--email=${this.adminUser.email}`,
            `--title=${this.boardTitle}`,
            `--url=${this.boardUrl}`,
            '--skip-statistics'
        ]
    }

    toString(): string {
        return ['php cmd.php xf:install', ...this.toArray()].join(' ')
    }

    static fromInput(): InstallCommand {
        return new InstallCommand(
            {
                username: core.getInput('username'),
                password: core.getInput('password'),
                email: core.getInput('email'),
            },
            core.getInput('boardTitle'),
            core.getInput('boardUrl'),
        )
    }
}
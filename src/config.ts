import core from "@actions/core";

interface DBOptions {
    host: string,
    port: number
    username: string,
    password: string,
    dbname: String
}

export class Config {
    constructor(
        private readonly db: DBOptions,
        private readonly debugMode: boolean,
        private readonly devMode: boolean
    ) {}

    toString(): string {
        return `<?php
        $config['db']['host'] = '${this.db.host}';
        $config['db']['port'] = ${this.db.port};
        $config['db']['username'] = '${this.db.username}';
        $config['db']['password'] = '${this.db.password}';
        $config['db']['dbname'] = '${this.db.dbname}';
        
        $config['debug'] = ${this.debugMode};
        $config['development']['enabled'] = ${this.devMode};
        `
    }

    static fromInput(): Config {
        return new Config(
            {
                host: core.getInput('dbHost'),
                port: parseInt(core.getInput('dbHost')),
                username: core.getInput('dbHost'),
                password: core.getInput('dbHost'),
                dbname: core.getInput('dbHost'),
            },
            core.getBooleanInput('debugMode'),
            core.getBooleanInput('devMode')
        )
    }
}
import * as core from "@actions/core";
import {exec} from "@actions/exec";
import axios from "axios";
import decompress from 'decompress';
import {Config} from "./config";
import * as fs from "fs/promises";
import * as io from '@actions/io';
import {InstallCommand} from "./installCommand";
import * as glob from '@actions/glob';

export async function installXenForo() {
    const globber = await glob.create(core.getInput('path'), {
        matchDirectories: true
    })
    const installDir = (await globber.glob())[0]
    if (!installDir)
    {
        throw new Error("Invalid installation path")
    }

    process.chdir(installDir)

    await downloadAndExtractDistro()
    await generateAndWriteConfig()
    await runInstall()
}

async function downloadAndExtractDistro() {
    const distUrl = core.getInput('distUrl')
    const resp = await axios.get(distUrl, {
        responseType: "blob"
    })

    await decompress(resp.data, '.')
    await io.mv('upload/*', '.')
    await io.rmRF('upload')
}

async function generateAndWriteConfig() {
    await fs.writeFile(
        '/src/config.php',
        Config.fromInput().toString()
    )
}

async function runInstall() {
    await exec('php', InstallCommand.fromInput().toArray())
}
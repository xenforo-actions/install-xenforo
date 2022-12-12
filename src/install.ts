import * as core from "@actions/core";
import {exec} from "@actions/exec";
import axios from "axios";
import decompress from 'decompress';
import {Config} from "./config";
import * as fs from "fs/promises";
import * as io from '@actions/io';
import {InstallCommand} from "./installCommand";

export async function installXenForo() {
    const installationPath = core.getInput('path')
    await exec('cd ' + installationPath)

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
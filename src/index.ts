import {installXenForo} from "./install";
import core from "@actions/core";

async function run() {
    await installXenForo()
}

run().then(_ => {
    core.info("XenForo installed!")
})

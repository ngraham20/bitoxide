/** @param {NS} ns */
export async function main(ns) {
    let pservs = ns.read("purchased-servers.txt");
    let pservConnections = pservs.split(/\n/);
    for (const con of pservConnections) {
        if (con) {
            ns.tprint("Accessing: " + con);
            initialize(ns, con);
        }
    }
}
/** @param {NS} ns */
function initialize(ns, con) {
    let botnet = "dynamic-hack.js";
    let maxRam = ns.getServerMaxRam(con);
    let requiredRam = ns.getScriptRam(botnet, "home");
    let numThreads = 0;
    if (requiredRam) {
        numThreads = Math.trunc(maxRam / requiredRam);
    }
    if (numThreads) {
        ns.scp(botnet, con);
        ns.killall(con);
        ns.exec(botnet, con, numThreads);
    }
}
/** @param {NS} ns */
export async function main(ns) {
    let context = {
      visited: [],
      path: [{"home": "home"}],
      maxdepth: ns.args[0] || 4,
      maxlevel: 3,
    };
    // delete old level files
    for (let i = 0; i <= 5; i++) {
      ns.rm("level"+i+"servers.txt");
    }
    // analyze(ns, context, "home", 0);
    analyze(ns, context);
    ns.write("paths.txt", JSON.stringify(context.path), "w");
  }
  
  function analyze(ns, ctx) {
    // for each depth asked for
    for (let depth = 0; depth < ctx.maxdepth; depth++) {
      ctx.path.push({});
  
      // iterate all connections at this depth for sub-connections
      // put those sub-connections in the next-highest depth
      let homes = ctx.path[depth];
      for(const [home, _] of Object.entries(homes)) {
        let connections = ns.scan(home);
        for (const con of connections) {
          let lvl = ns.getServerNumPortsRequired(con);
          if (!ctx.visited.includes(con)) {
            ns.tprint("Discovered: "+con);
            ns.tprint("Depth: "+(depth+1));
            ctx.visited.push(con);
            ctx.path[depth+1][con] = ctx.path[depth][home]+">"+con;
            ns.write("level"+lvl+"servers.txt", con+"\n", "a");
          }
        }
      }
    }
  }
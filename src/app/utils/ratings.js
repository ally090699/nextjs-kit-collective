const stars = {
    zerostar: "☆☆☆☆☆",
    onestar: "★☆☆☆☆",
    twostars: "★★☆☆☆",
    threestars: "★★★☆☆",
    fourstars: "★★★★☆",
    fivestars: "★★★★★"
  }

const rating = (avgrating) => {
    if (avgrating==0) {
      return stars.zerostar;
    } else if (avgrating==1) {
      return stars.onestar;
    } else if (avgrating==2) {
      return stars.twostars;
    } else if (avgrating==3) {
      return stars.threestars;
    } else if (avgrating==4) {
      return stars.fourstars;
    } else if (avgrating==5) {
      return stars.fivestars;
    }
}

export {stars, rating};
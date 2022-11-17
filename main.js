// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
}

const pAequorFactory = (num, dnaArr) => {
  return {
    specimanNum: num,
    dna: dnaArr,
    mutate () {
      let currBase = this.dna[Math.floor(Math.random() * 15)]; //find current base to mutate 
      console.log(currBase);       
      newBase = returnRandBase();
      console.log(newBase); 
      while (newBase === currBase) {
        newBase = returnRandBase();        
      } 
      
      this.dna.splice(this.dna.indexOf(currBase), 1, newBase);      

      return this.dna;
    },
    compareDNA (otherOrg) {
      const similarities = this.dna.reduce((acc, curr, idx, arr) => {
        if (arr[idx] === otherOrg.dna[idx]) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      const percentOfDNAshared = (similarities / this.dna.length) * 100;
      const percentageTo2Deci = percentOfDNAshared.toFixed(2);
      console.log(`Speciman #${this.specimanNum} and speciman #${otherOrg.specimanNum} have ${percentageTo2Deci}% DNA in common.`);
    },
    willLikelySurvive () {
      let count = 0;
      let survivalPercent = 0;
      for (const base of this.dna) {
        if (base === 'C' || base === 'G') {
          count++;
        }
      }
      survivalPercent = (count / this.dna.length) * 100;
      
      if (survivalPercent >= 60) {
        return true;
      } 
      return false;
    }
  };
}

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen)

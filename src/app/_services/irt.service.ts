import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IrtService {

  areaValues: Map<number, number> = new Map([
    [ - 3.5, 0.0002 ],
[ -3.45, 0.0003 ],
[ -3.40, 0.0003 ],
[ -3.35, 0.0004 ],
[ -3.3, 0.0005 ],
[ -3.25, 0.0006 ],
[ -3.2, 0.0007 ],
[ -3.15, 0.0008 ],
[ -3.1, 0.0010 ],
[ -3.05, 0.0011 ],
[ -3, 0.0013 ],
[ -2.95, 0.0016 ],
[ -2.9, 0.0019 ],
[ -2.85, 0.0022 ],
[ -2.8, 0.0026 ],
[ -2.75, 0.0030 ],
[ -2.7, 0.0035 ],
[ -2.65, 0.0040 ],
[ -2.6, 0.0047 ],
[ -2.55, 0.0054 ],
[ -2.5, 0.0062 ],
[ -2.45, 0.0071 ],
[ -2.4, 0.0082 ],
[ -2.35, 0.0094 ],
[ -2.30, 0.0107 ],
[ -2.25, 0.0122 ],
[ -2.20, 0.0139 ],
[ -2.15, 0.0158 ],
[ -2.10, 0.0179 ],
[ -2.05, 0.0202 ],
[ -2.00, 0.0228 ],
[ -1.95, 0.0256 ],
[ -1.90, 0.0287 ],
[ -1.85, 0.0322 ],
[ -1.80, 0.0359 ],
[ -1.75, 0.0401 ],
[ -1.70, 0.0446 ],
[ -1.65, 0.0495 ],
[ -1.60, 0.0548 ],
[ -1.55, 0.0606 ],
[ -1.50, 0.0668 ],
[ -1.45, 0.0735 ],
[ -1.40, 0.0808 ],
[ -1.35, 0.0885 ],
[ -1.30, 0.0968 ],
[ -1.25, 0.1056 ],
[ -1.20, 0.1151 ],
[ -1.15, 0.1251 ],
[ -1.10, 0.1357 ],
[ -1.05, 0.1469 ],
[ -1.00, 0.1587 ],
[ -0.95, 0.1711 ],
[ -0.90, 0.1841 ],
[ -0.85, 0.1977 ],
[ -0.80, 0.2119 ],
[ -0.75, 0.2266 ],
[ -0.70, 0.2420 ],
[ -0.65, 0.2578 ],
[ -0.60, 0.2743 ],
[ -0.55, 0.2912 ],
[ -0.50, 0.3085 ],
[ -0.45, 0.3264 ],
[ -0.40, 0.3446 ],
[ -0.35, 0.3632 ],
[ -0.30, 0.3821 ],
[ -0.25, 0.4013 ],
[ -0.20, 0.4207 ],
[ -0.15, 0.4404 ],
[ -0.10, 0.4602 ],
[ 0.00, 0.5000 ],
[ 0.05, 0.5199 ],
[ 0.10, 0.5398 ],
[ 0.15, 0.5596 ],
[ 0.20, 0.5793 ],
[ 0.25, 0.5987 ],
[ 0.30, 0.6179 ],
[ 0.35, 0.6368 ],
[ 0.40, 0.6554 ],
[ 0.45, 0.6736 ],
[ 0.50, 0.6915 ],
[ 0.55, 0.7088 ],
[ 0.60, 0.7257 ],
[ 0.65, 0.7422 ],
[ 0.70, 0.7580 ],
[ 0.75, 0.7734 ],
[ 0.80, 0.7881 ],
[ 0.85, 0.8023 ],
[ 0.90, 0.8159 ],
[ 0.95, 0.8289 ],
[ 1.00, 0.8413 ],
[ 1.05, 0.8531 ],
[ 1.10, 0.8643 ],
[ 1.15, 0.8749 ],
[ 1.20, 0.8849 ],
[ 1.25, 0.8944 ],
[ 1.30, 0.9032 ],
[ 1.35, 0.9115 ],
[ 1.40, 0.9192 ],
[ 1.45, 0.9265 ],
[ 1.50, 0.9332 ],
[ 1.55, 0.9394 ],
[ 1.60, 0.9452 ],
[ 1.65, 0.9505 ],
[ 1.70, 0.9554 ],
[ 1.75, 0.9599 ],
[ 1.80, 0.9641 ],
[ 1.85, 0.9678 ],
[ 1.90, 0.9713 ],
[ 1.95, 0.9744 ],
[ 2.00, 0.9772 ],
[ 2.05, 0.9798 ],
[ 2.10, 0.9821 ],
[ 2.15, 0.9842 ],
[ 2.20, 0.9861 ],
[ 2.25, 0.9878 ],
[ 2.30, 0.9893 ],
[ 2.35, 0.9906 ],
[ 2.40, 0.9918 ],
[ 2.45, 0.9929 ],
[ 2.50, 0.9938 ],
[ 2.55, 0.9946 ],
[ 2.60, 0.9953 ],
[ 2.65, 0.9960 ],
[ 2.70, 0.9965 ],
[ 2.75, 0.9970 ],
[ 2.80, 0.9974 ],
[ 2.85, 0.9978 ],
[ 2.90, 0.9981 ],
[ 2.95, 0.9984 ],
[ 3.00, 0.9987 ],
[ 3.05, 0.9989 ],
[ 3.10, 0.9990 ],
[ 3.15, 0.9992 ],
[ 3.20, 0.9993 ],
[ 3.25, 0.9994 ],
[ 3.30, 0.9995 ],
[ 3.35, 0.9996 ],
[ 3.40, 0.9997 ],
[ 3.45, 0.9997 ],
[ 3.50, 0.9998 ]
  ])

  constructor() { }

  calculateStandardError(sigmaSquare: number) {
    return Math.sqrt(sigmaSquare);
  }

  calculateProbabilityOfCorrectAnswer(theta: number, difficulty: number) {
    let term = Math.pow(Math.E, (theta - difficulty));
    return term / (1 + term);
  }

  calculateProbabilityOfWrongAnswer(theta: number, difficulty: number) {
    let term = Math.pow(Math.E, (theta - difficulty));
    return 1 / (1 + term);
  }

  calculateD(difficulty: number, theta: number, sigmaSquare: number) {
    //console.log(difficulty - theta);
    //console.log(Math.sqrt(1 + sigmaSquare));
    //console.log((difficulty - theta) / Math.sqrt(1 + sigmaSquare));
    return (difficulty - theta) / Math.sqrt(1 + sigmaSquare);
  }

  calculateOrdinateValueOfNormalCurveAtPointD(D: number) {
    return Math.pow(Math.E, (-1 / 2) * Math.pow(D, 2)) / Math.sqrt(2 * Math.PI);
  }

  calculateAreaUnderTheNormalCurve(D: number) {
    for(const [key, value] of this.areaValues.entries()) {
      if (key==Math.trunc(100 * (-D)) / 100)
      {
          return value;
      }
    }

    return -9999;
  }

  calculateCorrectAnswerTheta(theta: number, sigmaSquare: number, phi: number, Phi: number) {
    theta += ((sigmaSquare / Math.sqrt(1 + sigmaSquare)) * (phi/Phi));
    return theta;
}

  calculateWrongAnswerTheta(theta: number, sigmaSquare: number, phi: number, Phi: number) {
    theta -= ((sigmaSquare / Math.sqrt(1 + sigmaSquare)) * (phi/Phi));
    return theta;
  }

  calculateCorrectAnswerSigmaSquare(D: number, sigmaSquare: number, phi: number, Phi: number) {
    sigmaSquare *= (1 - (1 / (1 + 1 / sigmaSquare)) * (phi / Phi)) * (phi / Phi - D);
    return sigmaSquare;
}

  calculateWrongAnswerSigmaSquare(D: number, sigmaSquare: number, phi: number, Phi: number) {
    sigmaSquare *= (1 - ((phi / (1 + 1/sigmaSquare)) * ((phi/Phi) - D)/Phi));
    return sigmaSquare;
}



}

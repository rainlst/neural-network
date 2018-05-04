import numeric from 'numeric'
import INeuralLayer from './type'

export default class NeuralLayer implements INeuralLayer {
  public input: Array<any>
  public output: Array<any>
  public weight: Array<any>
  private amount: number
  private activationType: string
  constructor(amount: number, activationType: string = 'sigmoid' || 'softmax') {
    this.activationType = activationType
    this.amount = amount
  }

  initWeight() {
    this.weight = numeric.sub(
      numeric.mul(2, numeric.random([this.input[0].length, this.amount])),
      1
    )
  }

  private derivSigmoid(x: Array<any>) {
    return numeric.mul(x, numeric.sub(1, x))
  }

  private sigmoid(input: Array<any>) {
    return numeric.div(1, numeric.add(1, numeric.exp(numeric.neg(input))))
  }

  public forward() {
    if (!this.weight) {
      this.initWeight()
    }
    const directOutput = numeric.dot(this.input, this.weight)
    this.output = this.sigmoid(directOutput)
    // this.output = this.predict(this.input)
  }

  public backward() {
    return this.derivSigmoid(this.output)
  }
}

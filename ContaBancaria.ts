export default class ContaBancaria {
  numeroConta: string;
  agencia: string;
  private saldo: number;
  private extrato: string[];

  constructor(numeroConta: string, agencia: string, saldoInicial: number = 0) {
      this.numeroConta = numeroConta;
      this.agencia = agencia;
      this.saldo = saldoInicial;
      this.extrato = [];
  }

  depositar(valor: number): void {
      if (valor <= 0) {
          throw new Error("O valor do depósito deve ser positivo.");
      }
      this.saldo += valor;
      this.registrarOperacao(`Depósito de R$ ${valor.toFixed(2)}`);
  }

  sacar(valor: number): void {
      if (valor <= 0) {
          throw new Error("O valor do saque deve ser positivo.");
      }
      if (valor > this.saldo) {
          throw new Error("Saldo insuficiente para realizar o saque.");
      }
      this.saldo -= valor;
      this.registrarOperacao(`Saque de R$ ${valor.toFixed(2)}`);
  }

  transferir(valor: number, contaDestino: ContaBancaria): void {
      if (valor <= 0) {
          throw new Error("O valor da transferência deve ser positivo.");
      }
      if (valor > this.saldo) {
          throw new Error("Saldo insuficiente para realizar a transferência.");
      }

      this.registrarOperacao(`Transferência de R$ ${valor.toFixed(2)} para conta ${contaDestino.numeroConta}`);

      this.saldo -= valor;
      contaDestino.receberTransferencia(valor, this.numeroConta);
  }

  private receberTransferencia(valor: number, numeroContaOrigem: string): void {
      this.saldo += valor;
      this.registrarOperacao(`Recebimento de transferência de R$ ${valor.toFixed(2)} da conta ${numeroContaOrigem}`);
  }

  consultarSaldo(): number {
      return this.saldo;
  }

  exibirExtrato(): string[] {
      return this.extrato;
  }

  private registrarOperacao(descricao: string): void {
      const data = new Date().toLocaleString();
      this.extrato.push(`[${data}] - ${descricao}`);
  }
}

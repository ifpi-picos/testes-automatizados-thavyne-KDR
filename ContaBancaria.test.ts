 import { beforeEach, describe, expect, test } from "bun:test";
import ContaBancaria from "./ContaBancaria.ts";

describe('Testes da classe ContaBancaria', () => {
    let conta1: ContaBancaria;
    let conta2: ContaBancaria;

    beforeEach(() => {
        conta1 = new ContaBancaria('12345', '001', 1000);
        conta2 = new ContaBancaria('67890', '002', 500);
    });

    test('Deve permitir o depósito', () => {
        conta1.depositar(500);
        expect(conta1.consultarSaldo()).toBe(1500);

        const extrato = conta1.exibirExtrato();
        expect(extrato[0]).toMatch(/Depósito de R\$ 500.00/);
    });

    test('Deve permitir o saque', () => {
        conta1.sacar(300);
        expect(conta1.consultarSaldo()).toBe(700);

        const extrato = conta1.exibirExtrato();
        expect(extrato[0]).toMatch(/Saque de R\$ 300.00/);
    });

    test('Deve lançar erro para saque com valor inválido', () => {
        expect(() => conta1.sacar(2000)).toThrowError("Saldo insuficiente para realizar o saque.");
    });

    test('Deve realizar transferências entre contas', () => {
        conta1.transferir(200, conta2);

        expect(conta1.consultarSaldo()).toBe(800);
        expect(conta2.consultarSaldo()).toBe(700);
        
        const extratoConta1 = conta1.exibirExtrato();
        expect(extratoConta1[0]).toMatch(/Transferência de R\$ 200.00 para conta 67890/);

        const extratoConta2 = conta2.exibirExtrato();
        expect(extratoConta2[0]).toMatch(/Recebimento de transferência de R\$ 200.00 da conta 12345/);
    });

    test('Deve exibir o extrato corretamente', () => {
        conta1.depositar(100);
        conta1.sacar(50);

        const extrato = conta1.exibirExtrato();
        expect(extrato.length).toBe(2);
        expect(extrato[0]).toMatch(/Depósito de R\$ 100.00/);
        expect(extrato[1]).toMatch(/Saque de R\$ 50.00/);
    });
});



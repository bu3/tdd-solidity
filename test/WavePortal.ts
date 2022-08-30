import {expect} from "chai";
import {ethers} from "hardhat";

describe("WavePortal", function () {
    it("should load the contract", async function () {
        const contract = await ethers.getContractFactory("WavePortal");
    });

    it("should return default total waves for a new contract", async function () {
        const contract = await ethers.getContractFactory("WavePortal");
        const wavePortal = await contract.deploy()

        expect(await wavePortal.totalWaves()).to.equal(0)
    });

    it("should return total waves for a new contract", async function () {
        const contract = await ethers.getContractFactory("WavePortal");
        const wavePortal = await contract.deploy()

        expect(await wavePortal.totalWaves()).to.equal(0)

        await wavePortal.wave('Hello')

        expect(await wavePortal.totalWaves()).to.equal(1)
    });

    it("should list all waves for a new contract", async function () {
        const contract = await ethers.getContractFactory("WavePortal");
        const wavePortal = await contract.deploy()

        expect(await wavePortal.totalWaves()).to.equal(0)
        expect(await wavePortal.allWaves()).has.length(0)

        await wavePortal.wave('Hello')
        const waves = await wavePortal.allWaves();

        expect(waves).has.length(1)
        expect(await waves[0].message).to.equal('Hello')
    });

    it("should list the address of the author", async function () {
        const [owner, random] = await ethers.getSigners();
        const contract = await ethers.getContractFactory("WavePortal");
        const wavePortal = await contract.deploy()

        await wavePortal.wave('Hello')
        await wavePortal.connect(random).wave('Hello to you')
        const waves = await wavePortal.allWaves();

        expect(waves).has.length(2)
        expect(await waves[0].message).to.equal('Hello')
        expect(await waves[0].owner).to.equal(owner.address)

        expect(await waves[1].message).to.equal('Hello to you')
        expect(await waves[1].owner).to.equal(random.address)
    });

})
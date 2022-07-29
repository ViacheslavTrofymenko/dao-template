import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import deployGovernanceToken from "./01-deploy-governor-token"
import { ethers } from "hardhat"

const deployBox: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments } = hre
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    log("Deploying Box....")
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    })
    const timeLock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address)
    const transferOwnerTx = await boxContract.transferOwnership(
        timeLock.address
    )
    await transferOwnerTx.wait(1)
    log("This is DONE!!! DAO)) 🥇")
}

export default deployBox
deployBox.tags = ["all", "deployBox"]
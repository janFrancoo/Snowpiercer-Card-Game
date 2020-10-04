import scenerios from "../scenerios/scenerios"
import { storeData, removeData } from "../helpers/storage_helper"

const getScenerioIndexById = (id) => {
    for (let i=0; i<scenerios["en"].length; i++)
        if (scenerios["en"][i].id == id)
            return i

    return -1
}

const resetProgress = () => {
    storeData("p1", "0.5")
    storeData("p2", "0.5")
    storeData("p3", "0.5")
    storeData("p4", "0.5")
    storeData("secret", "0")
    storeData("tailorRebel", "0")
    storeData("nightCarRebel", "0")
    removeData("days")
}

export { 
    getScenerioIndexById,
    resetProgress 
}

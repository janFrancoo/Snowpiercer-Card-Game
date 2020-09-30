import scenerios from "../scenerios/scenerios"

const getScenerioIndexById = (id) => {
    for (let i=0; i<scenerios["en"].length; i++)
        if (scenerios["en"][i].id == id)
            return i

    return -1
}

export { getScenerioIndexById }

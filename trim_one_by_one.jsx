function trimOneByOne() {
    try {
        var doc = app.activeDocument;
        var currentLayerName = "Left Goblin";
        
        // Process the Left Goblin layer
        doc.activeLayer = doc.artLayers.getByName(currentLayerName);
        
        // Remove purple background
        var idClrR = charIDToTypeID("ClrR");
        var desc = new ActionDescriptor();
        var idFzns = charIDToTypeID("Fzns");
        desc.putInteger(idFzns, 50);
        
        var idMnCl = charIDToTypeID("MnCl");
        var desc2 = new ActionDescriptor();
        var idRd = charIDToTypeID("Rd  ");
        desc2.putDouble(idRd, 128);
        var idGrn = charIDToTypeID("Grn ");
        desc2.putDouble(idGrn, 0);
        var idBl = charIDToTypeID("Bl  ");
        desc2.putDouble(idBl, 128);
        var idRGBC = charIDToTypeID("RGBC");
        desc.putObject(idMnCl, idRGBC, desc2);
        
        executeAction(idClrR, desc, DialogModes.NO);
        
        // Delete the selected background
        doc.selection.clear();
        doc.selection.deselect();
        
        // Select transparent pixels of the layer
        var idsetd = charIDToTypeID("setd");
        var desc3 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idTrsp = charIDToTypeID("Trsp");
        ref.putProperty(idChnl, idTrsp);
        desc3.putReference(idnull, ref);
        var idInvr = charIDToTypeID("Invr");
        desc3.putBoolean(idInvr, true);
        executeAction(idsetd, desc3, DialogModes.NO);
        
        // Create a new layer based on this selection
        var idCpyM = charIDToTypeID("CpyM");
        executeAction(idCpyM, undefined, DialogModes.NO);
        
        var newLayer = doc.artLayers.add();
        newLayer.name = currentLayerName + " (Trimmed)";
        
        var idPstI = charIDToTypeID("PstI");
        executeAction(idPstI, undefined, DialogModes.NO);
        
        // Hide the original layer
        doc.artLayers.getByName(currentLayerName).visible = false;
        
        alert(currentLayerName + " 처리 완료");
        
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

trimOneByOne();
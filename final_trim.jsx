function finalTrim() {
    try {
        var doc = app.activeDocument;
        var layerNames = ["Goblin Miner", "Goblin Pharaoh", "Goblin Pirate"];
        
        for (var i = 0; i < layerNames.length; i++) {
            // Select the layer
            doc.activeLayer = doc.artLayers.getByName(layerNames[i]);
            
            // Duplicate to a new document
            var idDplc = charIDToTypeID("Dplc");
            var desc = new ActionDescriptor();
            var idnull = charIDToTypeID("null");
            var ref = new ActionReference();
            var idLyr = charIDToTypeID("Lyr ");
            var idOrdn = charIDToTypeID("Ordn");
            var idTrgt = charIDToTypeID("Trgt");
            ref.putEnumerated(idLyr, idOrdn, idTrgt);
            desc.putReference(idnull, ref);
            var idT = charIDToTypeID("T   ");
            var idDcmn = charIDToTypeID("Dcmn");
            desc.putClass(idT, idDcmn);
            var idNm = charIDToTypeID("Nm  ");
            desc.putString(idNm, layerNames[i] + "_Temp");
            executeAction(idDplc, desc, DialogModes.NO);
            
            // In the new document, trim transparent pixels
            var idTrns = charIDToTypeID("Trns");
            var desc2 = new ActionDescriptor();
            var idTrnp = charIDToTypeID("Trnp");
            desc2.putClass(idTrnp, idTrnp);
            var idTop = charIDToTypeID("Top ");
            desc2.putBoolean(idTop, true);
            var idLft = charIDToTypeID("Lft ");
            desc2.putBoolean(idLft, true);
            var idBtom = charIDToTypeID("Btom");
            desc2.putBoolean(idBtom, true);
            var idRght = charIDToTypeID("Rght");
            desc2.putBoolean(idRght, true);
            executeAction(idTrns, desc2, DialogModes.NO);
            
            // Select all and copy
            app.activeDocument.selection.selectAll();
            app.activeDocument.selection.copy();
            
            // Close the temp document without saving
            app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
            
            // Go back to original document
            doc.activeLayer = doc.artLayers.getByName(layerNames[i]);
            
            // Create a new layer and paste
            var newLayer = doc.artLayers.add();
            newLayer.name = layerNames[i] + "_Trimmed";
            doc.paste();
            
            // Hide the original layer
            doc.artLayers.getByName(layerNames[i]).visible = false;
        }
        
        alert("모든 고블린 레이어가 정확하게 크기 조정되었습니다!");
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

finalTrim();
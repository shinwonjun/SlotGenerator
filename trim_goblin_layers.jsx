function trimGoblinLayers() {
    try {
        var doc = app.activeDocument;
        var layerNames = ["Left Goblin", "Middle Goblin", "Right Goblin"];
        
        for (var i = 0; i < layerNames.length; i++) {
            try {
                // Select the goblin layer
                doc.activeLayer = doc.artLayers.getByName(layerNames[i]);
                
                // First, remove purple background to ensure proper trimming
                // Use Color Range to select the purple background
                var idClrR = charIDToTypeID("ClrR");
                var desc = new ActionDescriptor();
                var idFzns = charIDToTypeID("Fzns");
                desc.putInteger(idFzns, 50); // Fuzziness value
                
                var idMnCl = charIDToTypeID("MnCl");
                var desc2 = new ActionDescriptor();
                var idRd = charIDToTypeID("Rd  ");
                desc2.putDouble(idRd, 128); // Red component for purple
                var idGrn = charIDToTypeID("Grn ");
                desc2.putDouble(idGrn, 0);  // Green component for purple
                var idBl = charIDToTypeID("Bl  ");
                desc2.putDouble(idBl, 128); // Blue component for purple
                var idRGBC = charIDToTypeID("RGBC");
                desc.putObject(idMnCl, idRGBC, desc2);
                
                executeAction(idClrR, desc, DialogModes.NO);
                
                // Delete the selection
                doc.selection.clear();
                doc.selection.deselect();
                
                // Create a new document from this layer
                // Duplicate the current layer to a new document
                var idDplc = charIDToTypeID("Dplc");
                var desc3 = new ActionDescriptor();
                var idnull = charIDToTypeID("null");
                var ref = new ActionReference();
                var idLyr = charIDToTypeID("Lyr ");
                var idOrdn = charIDToTypeID("Ordn");
                var idTrgt = charIDToTypeID("Trgt");
                ref.putEnumerated(idLyr, idOrdn, idTrgt);
                desc3.putReference(idnull, ref);
                var idT = charIDToTypeID("T   ");
                var idDcmn = charIDToTypeID("Dcmn");
                desc3.putClass(idT, idDcmn);
                var idNm = charIDToTypeID("Nm  ");
                desc3.putString(idNm, "Temp " + layerNames[i]);
                executeAction(idDplc, desc3, DialogModes.NO);
                
                // In the new document, trim transparent pixels
                var idTrim = charIDToTypeID("Trim");
                var desc4 = new ActionDescriptor();
                var idBsd = charIDToTypeID("Bsd ");
                var idTrnp = charIDToTypeID("Trnp");
                desc4.putEnumerated(idBsd, idBsd, idTrnp);
                var idTop = charIDToTypeID("Top ");
                desc4.putBoolean(idTop, true);
                var idLft = charIDToTypeID("Lft ");
                desc4.putBoolean(idLft, true);
                var idBtom = charIDToTypeID("Btom");
                desc4.putBoolean(idBtom, true);
                var idRght = charIDToTypeID("Rght");
                desc4.putBoolean(idRght, true);
                executeAction(idTrim, desc4, DialogModes.NO);
                
                // Select all and copy
                app.activeDocument.selection.selectAll();
                app.activeDocument.selection.copy();
                
                // Close temp document without saving
                app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
                
                // Go back to original document
                doc.activeLayer = doc.artLayers.getByName(layerNames[i]);
                
                // Create a new trimmed layer
                var newLayer = doc.artLayers.add();
                newLayer.name = layerNames[i] + " (Trimmed)";
                doc.paste();
                
                // Hide the original layer
                doc.artLayers.getByName(layerNames[i]).visible = false;
                
                alert(layerNames[i] + " 레이어가 고블린 사이즈로 맞춰졌습니다.");
            } catch (layerError) {
                alert(layerNames[i] + " 처리 중 오류: " + layerError);
            }
        }
        
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

trimGoblinLayers();
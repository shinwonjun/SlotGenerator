function checkActualGoblinSize() {
    try {
        var doc = app.activeDocument;
        
        // Select the Right Goblin layer
        try {
            doc.activeLayer = doc.artLayers.getByName("Right Goblin");
        } catch (e) {
            try {
                doc.activeLayer = doc.artLayers.getByName("Right Goblin (Trimmed)");
            } catch (e2) {
                alert("Right Goblin 레이어를 찾을 수 없습니다.");
                return false;
            }
        }
        
        // Load transparency as selection to get the actual goblin area
        var idsetd = charIDToTypeID("setd");
        var desc = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idTrsp = charIDToTypeID("Trsp");
        ref.putProperty(idChnl, idTrsp);
        desc.putReference(idnull, ref);
        var idInvr = charIDToTypeID("Invr");
        desc.putBoolean(idInvr, true);
        executeAction(idsetd, desc, DialogModes.NO);
        
        // Get the bounds of the selection (which is the goblin)
        var bounds = doc.selection.bounds;
        var width = bounds[2].value - bounds[0].value;
        var height = bounds[3].value - bounds[1].value;
        
        // Deselect
        doc.selection.deselect();
        
        // Check document units
        var units = "";
        switch(doc.width.type) {
            case UnitValue.PIXELS: units = "pixels"; break;
            case UnitValue.INCHES: units = "inches"; break;
            case UnitValue.CM: units = "cm"; break;
            default: units = "unknown units";
        }
        
        // Get image dimensions
        var docWidth = doc.width.value;
        var docHeight = doc.height.value;
        
        alert("Right Goblin 실제 고블린 사이즈:\n\n" + 
              "Width: " + width + " " + units + "\n" +
              "Height: " + height + " " + units + "\n\n" +
              "Goblin bounds: [" + bounds[0].value + ", " + bounds[1].value + ", " + 
              bounds[2].value + ", " + bounds[3].value + "] " + units + "\n\n" +
              "Document size: " + docWidth + " x " + docHeight + " " + units);
        
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

checkActualGoblinSize();
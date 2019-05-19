import Cellular from "./../package";

class RenderCell extends Cellular.Cell {
    constructor(html) {
        super({
            html
        },
        Organelle.Package(
            [ "render", payload => payload.cell.GetState().html ] 
        ));
    }
}

export default RenderCell;
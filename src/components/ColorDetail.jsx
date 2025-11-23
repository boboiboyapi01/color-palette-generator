import { getColorName } from "../utils/colorUtils";

export default function ColorDetails({ hex }) {
  const name = getColorName(hex);
    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-2">Color Details</h3>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Hex:</strong> {hex}</p>
        </div>
    );
}
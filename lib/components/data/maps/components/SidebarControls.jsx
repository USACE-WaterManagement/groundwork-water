const SidebarControls = ({ baseLayers, additionalLayers, layerVisibility, onLayerToggle }) => (
    <div style={{ maxWidth: "300px", padding: "10px", backgroundColor: "#f7f7f7" }}>
        <h3>Base Layers</h3>
        <div className="mb-3">
            {Object.keys(baseLayers).map((key, idx) => (
                <div key={key}>
                    <label>
                        <input type="radio" name="layer" defaultChecked={idx == 0} checked={layerVisibility[key]} onChange={() => onLayerToggle(key)} />
                        &nbsp;{key.toUpperCase()}
                    </label>
                </div>
            ))}</div>

        {additionalLayers && (
            <>
                <h3>Additional Layers</h3>
                {additionalLayers.map((layer) => (
                    <div key={layer?.key}>
                        <label>
                            <input type="checkbox" checked={layer?.visibility} onChange={() => layer?.onToggle(layer?.key)} />
                            &nbsp;{layer?.label}
                        </label>
                    </div>

                ))}
            </>
        )}
    </div>
);

export default SidebarControls;
export { SidebarControls };
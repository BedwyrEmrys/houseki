import { gltfPlugin } from "lattice-engine/gltf";
import { defaultPlugin } from "lattice-engine/utils";
import { WorldBuilder } from "thyseus";

import { loadingSystem } from "../components/loading/system";
import { statsSystem } from "../components/stats/system";
import { ExportSchedule, handleExport, sendExportEvent } from "./export";

export function demoPlugin(builder: WorldBuilder) {
  builder
    .addPlugin(defaultPlugin)
    .addPlugin(gltfPlugin)
    .addSystems(statsSystem, loadingSystem, handleExport)
    .addSystemsToSchedule(ExportSchedule, sendExportEvent);
}
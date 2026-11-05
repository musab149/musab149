import dynamic from "next/dynamic";

/**
 * Code-split the filterable stacking-card explorer (Motion layout animations)
 * so pages only download it when there are projects to show.
 */
export const WorkExplorerLazy = dynamic(() => import("./WorkExplorer").then((mod) => mod.WorkExplorer));

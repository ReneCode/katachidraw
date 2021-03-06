import * as React from "react"; // for expo
import { FC, ReactElement, memo } from "react";
import { G, Rect } from "react-native-svg";
import { useAtom } from "jotai";

import { toolbarAtom } from "../atoms/toolbar";
import ColorPicker from "../components/ColorPicker";
import { hackTouchableNode } from "../utils/touchHandlerHack";
import PenIcon from "../icons/Pen";
import HandIcon from "../icons/Hand";
import ZoomInIcon from "../icons/ZoomIn";
import ZoomOutIcon from "../icons/ZoomOut";
import PaletteIcon from "../icons/Palette";
import DeleteIcon from "../icons/Delete";
import SaveIcon from "../icons/Save";
import ImageIcon from "../icons/Image";
import { FileSystemModule } from "../modules/file-system/FileSystemModule";

const icons: Record<string, ReactElement> = {
  pen: <PenIcon />,
  hand: <HandIcon />,
  zoomIn: <ZoomInIcon />,
  zoomOut: <ZoomOutIcon />,
  color: <PaletteIcon />,
  erase: <DeleteIcon />,
  save: <SaveIcon />,
  image: <ImageIcon />,
};

const left = 0;
const top = 0;
const size = 36;
const margin = 8;
const radius = 6;

type Props = {
  ColorPickerElement?: ReactElement;
  fileSystemModule: FileSystemModule;
};

export const Toolbar: FC<Props> = ({
  ColorPickerElement = <ColorPicker />,
  fileSystemModule,
}) => {
  const [tools, dispatch] = useAtom(toolbarAtom);
  return (
    <>
      <Rect
        x={left}
        y={top}
        rx={radius}
        ry={radius}
        width={size + margin * 2}
        height={margin + (size + margin) * tools.length}
        fill="#ddd"
        opacity="0.8"
      />
      {tools.map((tool, i) => (
        <G
          key={tool.id}
          onPress={() => {
            dispatch({ id: tool.id, fileSystemModule });
          }}
          ref={hackTouchableNode}
        >
          <Rect
            x={left + margin}
            y={top + margin + (size + margin) * i}
            rx={radius}
            ry={radius}
            width={size}
            height={size}
            stroke={tool.active ? "#000" : "none"}
            strokeWidth="2.5"
            fill="#aaa"
            opacity="0.8"
          />
          <G
            x={left + margin + (size - 24) / 2}
            y={top + margin + (size + margin) * i + (size - 24) / 2}
            fill="#444"
          >
            {icons[tool.id]}
          </G>
        </G>
      ))}
      <G
        id="colorpicker"
        transform={`translate(${left + size + margin * 3} ${top + margin})`}
      >
        {ColorPickerElement}
      </G>
    </>
  );
};

export default memo(Toolbar);

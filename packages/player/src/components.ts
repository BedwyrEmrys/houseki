import { initStruct, struct } from "thyseus";

import { PlayerControlsMode, PlayerControlsView } from "./types";

@struct
class Vec3 {
  @struct.array({ length: 3, type: "f32" }) declare array: Float32Array;

  set value(newValue: Readonly<[number, number, number]>) {
    this.array.set(newValue);
  }

  get value() {
    return [this.array[0], this.array[1], this.array[2]] as [
      number,
      number,
      number
    ];
  }
}

/**
 * The player's body.
 */
@struct
export class PlayerBody {
  /**
   * The base speed of the player.
   */
  @struct.f32 declare speed: number;

  /**
   * The strength of the player's jump.
   */
  @struct.f32 declare jumpStrength: number;

  /**
   * The spawn point of the player.
   */
  @struct.substruct(Vec3) declare spawnPoint: Vec3;

  /**
   * Teleport the player to spawn if they fall out of the world.
   */
  @struct.bool declare enableVoidTeleport: boolean;

  /**
   * The level below which the player will be teleported to spawn.
   */
  @struct.f32 declare voidLevel: number;

  constructor(
    speed = 4,
    jumpStrength = 4,
    spawnPoint: [number, number, number] = [0, 0, 0],
    enableVoidTeleport = true,
    voidLevel = -50
  ) {
    initStruct(this);

    this.speed = speed;
    this.jumpStrength = jumpStrength;
    this.spawnPoint.value = spawnPoint;
    this.enableVoidTeleport = enableVoidTeleport;
    this.voidLevel = voidLevel;
  }
}

/**
 * The player's camera.
 * Is attached to the player's body and follows it around.
 */
@struct
export class PlayerCamera {
  /**
   * Whether the controls are for first person, third person, or both.
   */
  @struct.u8 declare mode: PlayerControlsMode;

  /**
   * The active view, either first person or third person.
   * This is only used when mode is set to both.
   */
  @struct.u8 declare currentView: PlayerControlsView;

  /**
   * The distance of the camera from the player, when in third person mode.
   */
  @struct.f32 declare distance: number;

  constructor(
    mode = PlayerControlsMode.Both,
    currentView = PlayerControlsView.FirstPerson,
    cameraDistance = 3
  ) {
    initStruct(this);

    this.mode = mode;
    this.currentView = currentView;
    this.distance = cameraDistance;
  }
}

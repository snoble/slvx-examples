# Cam Follower Mechanism

A radial cam with a roller follower constrained to slide along a vertical guide.

![Cam Follower](cam_follower.svg)

## How It Works

The cam rotates around a fixed center point. As it rotates, the contact point on the cam's surface pushes the follower roller up and down along the vertical guide. This converts rotary motion into linear oscillating motion.

## Key Constraints Used

- **point_on_line**: Constrains the follower center to slide along the vertical guide
- **angle**: Sets the cam rotation angle (parametric input)
- **distance**: Defines cam radius and follower arm length
- **fixed**: Anchors the cam center and guide rails

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `cam_radius` | 40 mm | Radius of the circular cam |
| `cam_angle` | 30° | Current rotation angle of the cam |
| `guide_x` | 55 mm | X position of the follower guide |
| `follower_arm_length` | 25 mm | Length of the arm connecting contact point to follower center |

## Animation

Change `cam_angle` from 0° to 360° to simulate the cam rotating:
- At 0°: Follower is at lowest position
- At 90°: Follower rises to maximum height
- At 180°: Follower returns to lowest
- At 270°: Follower rises again

## Applications

- Engine valve trains
- Sewing machines
- Automatic machinery
- Packaging equipment

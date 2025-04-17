import { Request, Response, NextFunction } from "express";
import Room from "../models/Room";
import Message from "../models/Message";

// @desc    List all available rooms
// @route   GET /api/chat/rooms
// @access  protected
export const listRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all messages from one room
// @route   GET /api/chat/rooms/:id/messages
// @access  protected
export const getRoomMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: roomId } = req.params;
    const msgs = await Message.find({ toRoom: roomId })
      .populate("from", "username")
      .sort("timestamp");
    res.json(msgs);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all messages from one user
// @route   GET /api/chat/users/:userId/messages
// @access  protected
export const getUserMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const me = (req as any).user.id;
    const other = req.params.userId;
    const msgs = await Message.find({
      $or: [
        { from: me, toUser: other },
        { from: other, toUser: me },
      ],
    })
      .populate("from", "username")
      .sort("timestamp");
    res.json(msgs);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new room
// @route   POST /api/chat/roomss
// @access  protected (TODO only admin rights)
export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: "Room name is required" });
      return;
    }
    const exists = await Room.findOne({ name });
    if (exists) {
      res.status(400).json({ error: "Room already exists" });
      return;
    }
    const room = await Room.create({ name });
    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

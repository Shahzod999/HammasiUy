import { Request, Response } from "express";
import Property from "../models/propertyModel";
import asyncHandler from "../middleware/asyncHandler";

interface MapBoundary {
  northEast: { lat: number; lng: number };
  southWest: { lat: number; lng: number };
}

export const mapController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { bounds } = req.query;

      if (!bounds) {
        return res.status(400).json({ error: "Map boundaries are required" });
      }

      // Parse the boundary coordinates
      const mapBounds: MapBoundary = JSON.parse(bounds as string);

      // Find properties within the boundaries using aggregation pipeline
      const properties = await Property.aggregate([
        {
          $match: {
            "address.coordinates.lat": {
              $gte: mapBounds.southWest.lat,
              $lte: mapBounds.northEast.lat,
            },
            "address.coordinates.long": {
              $gte: mapBounds.southWest.lng,
              $lte: mapBounds.northEast.lng,
            },
          },
        },
        {
          $project: {
            _id: 1,
            coordinates: "$address.coordinates",
            price: "$details.price",
            currency: "$details.currency",
            rooms: "$details.rooms",
          },
        },
      ]);

      res.json(properties);
    } catch (error) {
      console.error("Error fetching map properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  }
);

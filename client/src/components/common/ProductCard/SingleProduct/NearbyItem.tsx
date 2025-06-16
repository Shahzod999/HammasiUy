const NearbyItem = ({ place }: { place: string }) => (
  <div className="nearby-item">
    <span className="nearby-icon">✓</span>
    <span>{place}</span>
  </div>
);

export default NearbyItem;

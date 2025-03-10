package indiv.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@ToString
public class GeometryDTO {
	private int gid;
	private String geometry;
	private String geoJson;
}

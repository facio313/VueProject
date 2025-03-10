package indiv.geometry;

import org.apache.ibatis.annotations.Mapper;

import indiv.dto.GeometryDTO;

@Mapper
public interface GeometryMapper {
	public int insertGeometry(GeometryDTO geometryDTO);
}

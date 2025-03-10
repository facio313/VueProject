package indiv.geometry;

import org.springframework.stereotype.Service;

import indiv.dto.GeometryDTO;
import jakarta.inject.Inject;

@Service
public class GeometryServiceImpl implements GeometryService {

	@Inject
	private GeometryMapper geometryMapper;
	
	@Override
	public int insertGeometry(GeometryDTO geometryDTO) {
		return geometryMapper.insertGeometry(geometryDTO);
	}

}

package indiv.dto;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;

import lombok.Data;

@Data
public class RequestDTO<T> {
	private Pageable page;
	private T dto;
}

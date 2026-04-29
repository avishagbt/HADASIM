import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { createLocationDto } from './dto/create-location.dto';

@Controller('location')
export class LocationController {

  constructor(private readonly locationService: LocationService) {}

  @Get()
  getAll() {
    return this.locationService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.locationService.getById(Number(id));
  }

  @Post()
  saveLocation(@Body() location: createLocationDto) {
    return this.locationService.save(location);
  }
}
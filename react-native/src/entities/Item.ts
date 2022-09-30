'use strict';

import { Entity, PrimaryColumn } from 'typeorm'

// This is a very simple example of a TypeORM model.
// See https://typeorm.io/entities#what-is-entity for more examples.
@Entity('items')
export class Item {
  @PrimaryColumn('text')
  value: string
}

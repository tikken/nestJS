import {BadRequestException, PipeTransform} from "@nestjs/common";
import {OrderStatus} from "./order.model";

export class OrderStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        OrderStatus.OPEN,
        OrderStatus.IN_PROGRESS,
        OrderStatus.DELIVERING,
        OrderStatus.DONE
    ];

    private isStatusValid(status: any) {
       const idx = this.allowedStatuses.indexOf(status);

       return idx !== -1;
    }

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value} is an invalid status"`);
        }

        return value;
    }
}
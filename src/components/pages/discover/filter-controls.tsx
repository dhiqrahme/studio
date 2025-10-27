"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import type { Interest } from '@/lib/types';
import { ListFilter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type FilterControlsProps = {
  interests: Omit<Interest, 'icon'>[];
};

export default function FilterControls({ interests }: FilterControlsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ListFilter className="h-4 w-4" />
              <span className="ml-2">{isOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </Button>
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <Label htmlFor="age-range">Age Range</Label>
                <Slider id="age-range" defaultValue={[18, 35]} max={100} min={18} step={1} />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>18</span>
                  <span>35</span>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="distance">Maximum Distance</Label>
                 <Select defaultValue="25">
                  <SelectTrigger id="distance">
                    <SelectValue placeholder="Select distance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                    <SelectItem value="25">25 miles</SelectItem>
                    <SelectItem value="50">50 miles</SelectItem>
                    <SelectItem value="100">100+ miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Interests</Label>
                <div className="grid grid-cols-2 gap-2">
                  {interests.slice(0, 4).map((interest) => (
                    <div key={interest.id} className="flex items-center gap-2">
                      <Checkbox id={`interest-${interest.id}`} />
                      <Label htmlFor={`interest-${interest.id}`} className="font-normal">
                        {interest.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

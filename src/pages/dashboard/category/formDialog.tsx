import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderButton } from '@/components/ui/loader-button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import query from '@/lib/query';
import categoryService from '@/services/category.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormDialogCategory = ({
  item,
  onSuccess,
  open,
  setOpen,
}: //onCancel,
{
  item?: Category;
  onSuccess?: () => void;
  setOpen?: (bool: boolean) => void;
  // onCancel?: () => void;
  open?: boolean;
}) => {
  const schema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string(),
    image: z.instanceof(File).optional().nullable(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        name: item.name,
        description: item.description ?? '',
      });
    }
  }, [item]);
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: categoryService.createCategory,
    onSuccess(data) {
      query.setQueryData(['categories'], (prev: Category[]) => [data, ...prev]);
      toast({
        description: 'Category created successfully',
      });
      onSuccess?.();
      setOpen?.(false);
    },
    onError(error) {
      console.error(error);
      toast({
        description: 'Something went wrong',
      });
    },
  });

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: categoryService.updateCategory,
    onSuccess() {
      query.invalidateQueries({ queryKey: ['categories'] });
      toast({
        description: 'Category updated successfully',
      });
      onSuccess?.();
      setOpen?.(false);
    },
    onError(error) {
      console.error(error);
      toast({
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    if (item) {
      update({
        id: item.id,
        data: {
          name: data.name,
          description: data.description,
        },
      });
    } else {
      mutate({ name: data.name, description: data.description });
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 pt-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Category name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Category description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        setOpen?.(false);
                      }}
                      variant="secondary"
                    >
                      Close
                    </Button>
                  </DialogClose>
                  <LoaderButton
                    isLoading={isPending || isUpdating}
                    type="submit"
                    className="w-[150px]"
                  >
                    {item ? 'Update' : 'Create'}
                  </LoaderButton>
                </div>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialogCategory;
